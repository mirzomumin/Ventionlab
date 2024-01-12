import pytest
from rest_framework import status

from .factories import CategoryFactory, CourseFactory


@pytest.mark.django_db
@pytest.mark.parametrize(
    "search_params, expected_course_titles",
    [
        ("?title=python", ["Python Developer"]),
        ("", ["Python Developer", "Java Developer", "Some Course"]),
        ("?search=developer", ["Python Developer", "Java Developer"]),
        ("?search=developer&level=3", ["Java Developer"]),
        ("?level=2", ["Python Developer", "Some Course"]),
        ("?category=2", ["Python Developer", "Java Developer"]),
        ("?search=css", []),
    ],
)
def test_search_filter_course(api_client, search_params, expected_course_titles):
    python_category = CategoryFactory.create(name="python", id=1)
    programming_category = CategoryFactory.create(name="programming", id=2)
    java_category = CategoryFactory.create(name="java", id=3)

    java_course = CourseFactory.create(
        title="Java Developer", level=3, category=[java_category, programming_category]
    )
    python_course = CourseFactory.create(
        title="Python Developer",
        level=2,
        category=[python_category, programming_category],
    )
    some_course = CourseFactory.create(title="Some Course", level=2)

    response = api_client.get(f"/api/courses/{search_params}")

    assert response.status_code == status.HTTP_200_OK
    assert all(course["title"] in expected_course_titles for course in response.json())
