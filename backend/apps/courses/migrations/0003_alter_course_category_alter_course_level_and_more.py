# Generated by Django 4.2.7 on 2023-12-01 12:48

import django.db.models.functions.text
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0002_category_tag_course_language_alter_course_level_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="category",
            field=models.ManyToManyField(to="courses.category"),
        ),
        migrations.AlterField(
            model_name="course",
            name="level",
            field=models.IntegerField(
                choices=[(1, "Easy"), (2, "Medium"), (3, "Advanced")], null=True
            ),
        ),
        migrations.AlterField(
            model_name="course",
            name="title",
            field=models.CharField(max_length=256),
        ),
        migrations.AlterField(
            model_name="lesson",
            name="title",
            field=models.CharField(max_length=256),
        ),
        migrations.AddConstraint(
            model_name="course",
            constraint=models.UniqueConstraint(
                django.db.models.functions.text.Lower("title"),
                name="course_insensitive_restriction",
            ),
        ),
        migrations.AddConstraint(
            model_name="lesson",
            constraint=models.UniqueConstraint(
                django.db.models.functions.text.Lower("title"),
                name="lesson_insensitive_restriction",
            ),
        ),
    ]
