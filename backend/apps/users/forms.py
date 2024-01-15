from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.contrib.auth.forms import UserCreationForm

from apps.users.models import InternshipGroup, InternshipParticipant, User
from apps.users.services.queries import build_participants_qs_by_role


class UserCreateForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email", "is_mentor")


class InternshipGroupForm(forms.ModelForm):
    mentors = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(is_mentor=True),
        required=False,
        widget=FilteredSelectMultiple(
            verbose_name="Mentors", is_stacked=False
        ),
    )

    students = forms.ModelMultipleChoiceField(
        queryset=User.objects.all(),
        required=False,
        widget=FilteredSelectMultiple(
            verbose_name="Students", is_stacked=True
        ),
    )

    class Meta:
        model = InternshipGroup
        fields = (
            "title",
            "course",
            "mentors",
            "students",
            "start_date",
            "end_date",
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if internship := kwargs.get("instance"):
            for group, role in (
                ("students", InternshipParticipant.UserRole.STUDENT),
                ("mentors", InternshipParticipant.UserRole.MENTOR),
            ):
                query = build_participants_qs_by_role(internship, role)
                self.fields[group].initial = User.objects.filter(query)

    def save(self, commit=True):
        instance: InternshipGroup = super().save(commit=False)
        instance.participants.clear()

        users_role_dispatch = {
            "mentors": [
                InternshipParticipant.UserRole.MENTOR,
                self.cleaned_data.get("mentors", []),
            ],
            "students": [
                InternshipParticipant.UserRole.STUDENT,
                self.cleaned_data.get("students", []),
            ],
        }

        for role, users in users_role_dispatch.values():
            for user in users:
                participant, _ = InternshipParticipant.objects.get_or_create(
                    role=role, user=user
                )
                if not instance.participants.filter(
                    internships__participants=participant
                ).exists():
                    instance.participants.add(participant)

        if commit:
            instance.save()
        return instance
