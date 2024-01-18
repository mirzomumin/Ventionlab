from django.contrib import admin

from apps.courses.models import Category, Course, Lesson, LessonInCourse, Tag


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Lesson)
class Lesson(admin.ModelAdmin):
    pass


@admin.register(LessonInCourse)
class LessonInCourse(admin.ModelAdmin):
    pass
