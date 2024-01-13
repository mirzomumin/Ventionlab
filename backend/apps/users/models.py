from typing import Optional, TypeVar

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

from common.models import BaseModel

UserType = TypeVar("UserType", bound=AbstractUser)


class UserManager(BaseUserManager):
    def create_user(
        self, email: str, password: Optional[str] = None, **extra_fields
    ) -> UserType:
        if email is None:
            raise TypeError("email is required")

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email: str, password: str, **extra_fields) -> UserType:
        if password is None:
            raise TypeError("password is required")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff = True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser = True")

        return self.create_user(email, password, **extra_fields)


class User(BaseModel, AbstractUser):
    email = models.EmailField(db_index=True, unique=True)

    description = models.CharField(max_length=255, null=True, blank=True)
    avatar = models.CharField(max_length=255, null=True, blank=True)  # May use S3
    is_mentor = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self) -> str:
        return f"User: {self.email}"


class UserInCourse(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "User in course"
        verbose_name_plural = "Users in courses"
        unique_together = ("user", "course")

    def __str__(self) -> str:
        return f"UserInCourse: {self.user} in {self.course}"


class InternshipParticipant(BaseModel):
    class UserRole(models.IntegerChoices):
        STUDENT = 1, "Student"
        MENTOR = 2, "Mentor"

    role = models.PositiveSmallIntegerField(choices=UserRole.choices)

    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name="internship_participants",
    )
    alias = models.CharField(max_length=25, null=True, blank=True)

    class Meta:
        verbose_name = "Internship participant"
        verbose_name_plural = "Internship participants"

    def __str__(self) -> str:
        return f"{self.user}"


class InternshipGroup(BaseModel):
    title = models.CharField(max_length=250)
    course = models.ForeignKey(
        to="courses.Course",
        on_delete=models.PROTECT,
        related_name="internships",
    )
    participants = models.ManyToManyField(
        to=InternshipParticipant,
        blank=True,
        related_name="internships",
    )
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        verbose_name = "Internship group"
        verbose_name_plural = "Internship groups"
        constraints = [
            models.CheckConstraint(
                check=~models.Q(start_date__gt=models.F("end_date")),
                name="end_date_checker",
                violation_error_message="End date cannot be \
                        early than start date.",
            ),
        ]

    def __str__(self) -> str:
        return f"Internship Group: {self.title}"
