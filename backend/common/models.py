from django.db import models


class BaseModel(models.Model):
    """BaseModel"""
    created_at = models.DateTimeField("Record creation time", auto_now_add=True)
    updated_at = models.DateTimeField("Time of record change", auto_now=True)

    class Meta:
        abstract = True
