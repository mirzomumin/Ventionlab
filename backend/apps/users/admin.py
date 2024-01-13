from django import forms
from django.contrib import admin

from apps.users.forms import InternshipGroupForm, UserCreateForm
from apps.users.models import InternshipGroup, InternshipParticipant, User, UserInCourse


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    def get_form(self, request, obj=None, change=False, **kwargs):
        if obj is None:
            self.form = UserCreateForm
        user_form = super().get_form(request, obj, **kwargs)

        if "description" in user_form.base_fields:
            user_form.base_fields["description"].widget = forms.Textarea()
        return user_form

    def get_fieldsets(self, request, obj=None) -> list[tuple[None, dict[str, list]]]:
        if obj is not None:
            self.fieldsets = (
                (
                    "Personal Info",
                    {
                        "fields": (
                            "username",
                            "email",
                            "first_name",
                            "last_name",
                            "description",
                            "avatar",
                        )
                    },
                ),
                (
                    "Permissions",
                    {
                        "fields": (
                            "is_staff",
                            "is_active",
                            "is_mentor",
                            "is_superuser",
                        )
                    },
                ),
            )
        else:
            self.fieldsets = [(None, {"fields": self.get_fields(request, obj)})]
        return super().get_fieldsets(request, obj)


@admin.register(InternshipParticipant)
class InternshipParticipantAdmin(admin.ModelAdmin):
    pass


@admin.register(InternshipGroup)
class InternshipGroupAdmin(admin.ModelAdmin):
    form = InternshipGroupForm


@admin.register(UserInCourse)
class UserInCourse(admin.ModelAdmin):
    pass
