from apps.courses.forms import CourseForm
from apps.courses.models import Course, LessonInCourse
from apps.courses.serializers.courses import CourseSerializer, LessonInCourseSerializer
from django.http.request import HttpRequest
from django.http.response import HttpResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404, redirect
from django.views import View, generic
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = LimitOffsetPagination

    permission_classes = [permissions.IsAuthenticated]

    filterset_fields = [
        "title",
        "level",
        "category",
    ]

    search_fields = [
        "title",
    ]

    @action(detail=True, methods=["get"], url_path=r"lessons")
    def get_course_lessons(self, request: HttpRequest, pk: int) -> HttpResponse:
        queryset = LessonInCourse.objects.filter(course=pk)
        serializer_class = LessonInCourseSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class CourseDeleteView(View):
    def post(self, request: HttpRequest, pk: int) -> HttpResponse:
        obj = get_object_or_404(Course, pk=pk)
        obj.delete()
        return redirect("list")


class CourseUpdateView(View):
    def post(self, request: HttpRequest, pk: int) -> HttpResponse:
        obj = get_object_or_404(Course, pk=pk)
        form = CourseForm(self.request.POST, instance=obj)
        if not form.is_valid():
            return HttpResponseBadRequest("Provided form's data invalid")
        form.save()
        return redirect("detail", pk=pk)


class CourseListView(generic.ListView):
    model = Course
    template_name = "courses/list.html"
    context_object_name = "courses"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = CourseForm()
        return context


class CourseDetailView(generic.DetailView):
    model = Course
    template_name = "courses/detail.html"
    context_object_name = "course"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = CourseForm(instance=context["object"])
        return context


class CourseCreateView(View):
    def post(self, request: HttpRequest) -> HttpResponse:
        form = CourseForm(self.request.POST)
        if form.is_valid():
            form.save()
        return redirect("/courses")
