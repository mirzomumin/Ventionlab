import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


@pytest.fixture
def access_token():
    user = User.objects.create_user(
        email='admin@mail.com',
        password='admin',
    )
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)


@pytest.fixture
def api_client(access_token):
    client = APIClient()
    client.credentials(
        HTTP_AUTHORIZATION=f'Bearer {access_token}'
    )
    return client
