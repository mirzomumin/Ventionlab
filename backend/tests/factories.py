import factory

from apps.courses.models import Category, Course


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category
        django_get_or_create = ('name',)


class CourseFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Course
        django_get_or_create = ('title', 'description', 'level', 'language')

    description = 'Some description for the course'
    language = 'EN'

    @factory.post_generation
    def category(self, create, extracted, **kwargs):
        if not create or not extracted:
            return

        self.category.add(*extracted)
