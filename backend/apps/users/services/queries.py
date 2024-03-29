from django.db.models import Q

from apps.users.models import InternshipGroup


def build_participants_qs_by_role(internship: InternshipGroup, role: int) -> Q:
    return Q(internship_participants__internships=internship) & Q(
        internship_participants__role=role
    )
