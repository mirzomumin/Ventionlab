from django.urls import path
from rest_framework.routers import SimpleRouter

from apps.courses import views

course_router = SimpleRouter()
course_router.register(r"", views.CourseViewSet, basename="course")


urlpatterns = [
    path(
        "<int:pk>/", views.CourseDetailView.as_view(), name='detail'
    ),
    path("<int:pk>/delete/", views.CourseDeleteView.as_view()),
    path("<int:pk>/change/", views.CourseUpdateView.as_view()),
    path(
        "create/", views.CourseCreateView.as_view(), name='create'
    ),
    path(
        "", views.CourseListView.as_view(), name='list'
    ),
]
