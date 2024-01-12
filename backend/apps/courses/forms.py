from apps.courses.models import Course
from django import forms


class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ["title", "description", "level",]

    def __init__(self, *args, **kwargs):
        super(CourseForm, self).__init__(*args, **kwargs)
        self.empty_label = "Select"
