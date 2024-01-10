from rest_framework import serializers

from apps.courses.models import Course, Lesson, LessonInCourse, Tag, Category


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)

    class Meta:
        model = Lesson
        fields = '__all__'


class LessonInCourseSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()

    class Meta:
        model = LessonInCourse
        fields = ['id', 'lesson', 'number']
