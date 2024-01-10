# tests/test_courses_crud.py
import pytest
from apps.courses.models import Course
from tests.factories import CategoryFactory, CourseFactory


base_url = "http://127.0.0.1:8000/courses"


@pytest.mark.django_db
def test_course_list_view(api_client):
    response = api_client.get(f"{base_url}/")
    assert response.status_code == 200
    assert "courses" in response.context
    assert "form" in response.context


@pytest.mark.django_db
def test_course_detail_view(api_client):
    python_category = CategoryFactory.create(name='python', id=1)
    programming_category = CategoryFactory.create(name='programming', id=2)
    python_course = CourseFactory.create(
        title='Python Developer',
        level=2,
        category=[python_category, programming_category]
    )
    url = f"{base_url}/{python_course.pk}/"
    response = api_client.get(url)
    assert response.status_code == 200
    assert "course" in response.context
    assert "form" in response.context
    assert response.context["course"].title == python_course.title
    assert response.context["course"].description == python_course.description
    assert response.context["course"].level == python_course.level


@pytest.mark.django_db
def test_course_create_view(api_client):
    python_category = CategoryFactory.create(name='python', id=1)
    programming_category = CategoryFactory.create(name='programming', id=2)
    python_course_data = {
        'title': 'Python Developer',
        'description': 'Some description',
        'level': 2,
        'language': 'EN',
        'category': [python_category, programming_category],
    }
    url = f"{base_url}/create/"
    response = api_client.post(url, data=python_course_data)
    assert response.status_code == 302
    assert Course.objects.all().count() == 1
    assert Course.objects.filter(title=python_course_data['title']).exists()
    assert Course.objects.filter(description=python_course_data['description']).exists()
    assert Course.objects.filter(level=python_course_data['level']).exists()


@pytest.mark.django_db
def test_course_update_view(api_client):
    python_category = CategoryFactory.create(name='python', id=1)
    programming_category = CategoryFactory.create(name='programming', id=2)
    python_course = CourseFactory.create(
        title='Python Developer',
        level=2,
        category=[python_category, programming_category]
    )
    updated_data = {
        'title': 'Updated Title',
        'description': 'Updated description',
        'level': 3,
        'language': 'FR',
    }
    url = f"{base_url}/{python_course.pk}/change/"
    response = api_client.post(url, data=updated_data)
    assert response.status_code == 302
    assert Course.objects.filter(title=updated_data['title']).exists()
    assert Course.objects.filter(description=updated_data['description']).exists()
    assert Course.objects.filter(level=updated_data['level']).exists()


@pytest.mark.django_db
def test_course_delete_view(api_client):
    python_category = CategoryFactory.create(name='python', id=1)
    programming_category = CategoryFactory.create(name='programming', id=2)
    python_course = CourseFactory.create(title='Python Developer', level=2,
                                         category=[python_category, programming_category])
    url = f"{base_url}/{python_course.pk}/delete/"
    response = api_client.post(url)
    assert response.status_code == 302
    assert not Course.objects.filter(title=python_course.title).exists()
    assert not Course.objects.filter(description=python_course.description).exists()
    assert not Course.objects.filter(level=python_course.level).exists()
