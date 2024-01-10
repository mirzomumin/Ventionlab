from django.db import models
from ckeditor.fields import RichTextField
from common.models import BaseModel
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from apps.users.models import User


class Category(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self) -> str:
        return f'Category: {self.name}'


class Course(BaseModel):
    class Complexity(models.IntegerChoices):
        EASY = 1, "Easy"
        MEDIUM = 2, "Medium"
        ADVANCED = 3, "Advanced"

    title = models.CharField(max_length=256)
    description = RichTextField()
    level = models.IntegerField(choices=Complexity.choices, null=True)
    language = models.CharField(max_length=32)
    category = models.ManyToManyField(Category)

    class Meta:
        constraints = [
            UniqueConstraint(
                Lower('title'),
                name='course_insensitive_restriction'
            )
        ]
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self) -> str:
        return f'Course: {self.title}'


class Tag(models.Model):
    name = models.CharField(max_length=128, unique=True)

    def __str__(self) -> str:
        return f'Tag: {self.name}'


class Lesson(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    tag = models.ManyToManyField(Tag, db_index=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                Lower('title'),
                name='lesson_insensitive_restriction'
            )
        ]
        verbose_name = 'Lesson'
        verbose_name_plural = 'Lessons'

    def __str__(self) -> str:
        return f'Lesson {self.title}'


class LessonInCourse(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    number = models.IntegerField()

    class Meta:
        unique_together = [['course', 'lesson'], ['course', 'number']]

    def __str__(self):
        return f'{self.lesson} in {self.course}'


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    text = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ('published_date',)
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'


