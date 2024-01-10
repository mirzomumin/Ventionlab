# tests/test_for_DRF_API.py
import json
import pytest

from apps.courses.models import Course
from tests.factories import CategoryFactory, CourseFactory

base_url = "http://127.0.0.1:8000/api/courses/"


@pytest.mark.django_db
def test_course_api_create(api_client):
    python_category = CategoryFactory.create(name='python', id=1)
    programming_category = CategoryFactory.create(name='programming', id=2)
    python_course_data = {
        'title': 'Python Developer',
        'description': 'Some description',
        'level': 2,
        'language': 'EN',
        'category': [python_category.id, programming_category.id],
    }
    response = api_client.post(base_url, python_course_data, format="json")
    assert response.status_code == 201
    assert Course.objects.count() == 1
    created_course_id = response.data['id']
    created_course_categories = Course.objects.get(id=created_course_id).category.values_list('id', flat=True)
    assert set(created_course_categories) == {python_category.id, programming_category.id}


@pytest.mark.django_db
def test_course_api_get(api_client):
    java_category = CategoryFactory.create(name='Java', id=2)
    programming_category = CategoryFactory.create(name='programming', id=3)
    java_course = CourseFactory.create(title='Python Developer', level=2,
                                       category=[java_category, programming_category])
    url = f"{base_url}{java_course.id}/"
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data['title'] == 'Python Developer'
    assert response.data['level'] == 2


@pytest.mark.django_db
def test_course_api_update(api_client):
    java_category = CategoryFactory.create(name='Java', id=2)
    programming_category = CategoryFactory.create(name='programming', id=3)
    java_course = CourseFactory.create(title='Python Developer', level=2,
                                       category=[java_category, programming_category])
    updated_data = {
        'title': 'Updated Java Developer',
        'description': 'Updated description',
        'level': 3,
        'language': 'RU',
        'category': [java_category.id, programming_category.id]
    }

    update_url = f"{base_url}{java_course.id}/"
    response = api_client.put(update_url, data=updated_data, format="json")
    assert response.status_code == 200
    updated_course = Course.objects.get(id=java_course.id)
    assert updated_course.title == updated_data['title']
    assert updated_course.description == updated_data['description']
    assert updated_course.level == updated_data['level']
    assert updated_course.language == updated_data['language']


@pytest.mark.django_db
def test_course_api_delete(api_client):
    python_category = CategoryFactory.create(name='python', id=1)
    programming_category = CategoryFactory.create(name='programming', id=2)
    python_course = CourseFactory.create(title='Python Developer', level=2,
                                         category=[python_category, programming_category])

    delete_url = f"{base_url}{python_course.id}/"
    response = api_client.delete(delete_url)
    assert response.status_code == 204
    assert Course.objects.count() == 0
