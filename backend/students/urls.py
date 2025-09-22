from django.urls import path
from .views import StudentSingleEndpoint

urlpatterns = [
    path('students/', StudentSingleEndpoint.as_view(), name='students-endpoint'),
]
