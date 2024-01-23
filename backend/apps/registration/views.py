from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def index(request: HttpRequest) -> HttpResponse:
    data = {
        "username": "mirzomumin",
        "first_name": "Mirzomumin",
        "last_name": "Sobirjonov",
    }
    return render(request, "index.html")
