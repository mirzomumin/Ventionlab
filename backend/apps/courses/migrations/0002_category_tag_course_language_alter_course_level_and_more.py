# Generated by Django 4.2.7 on 2023-11-27 11:45

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=64, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name="course",
            name="language",
            field=models.CharField(default=django.utils.timezone.now, max_length=32),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="course",
            name="level",
            field=models.CharField(
                choices=[("E", "Easy"), ("M", "Medium"), ("A", "Advanced")],
                db_index=True,
                max_length=2,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="course",
            name="title",
            field=models.CharField(max_length=256, unique=True),
        ),
        migrations.CreateModel(
            name="Lesson",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=256, unique=True)),
                ("description", models.TextField()),
                (
                    "tag",
                    models.ManyToManyField(db_index=True, to="courses.tag"),
                ),
            ],
            options={
                "verbose_name": "Lesson",
                "verbose_name_plural": "Lessons",
            },
        ),
        migrations.AddField(
            model_name="course",
            name="category",
            field=models.ManyToManyField(db_index=True, to="courses.category"),
        ),
        migrations.CreateModel(
            name="LessonInCourse",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("number", models.IntegerField()),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="courses.course",
                    ),
                ),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="courses.lesson",
                    ),
                ),
            ],
            options={
                "unique_together": {
                    ("course", "lesson"),
                    ("course", "number"),
                },
            },
        ),
    ]
