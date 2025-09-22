from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer
from django.shortcuts import get_object_or_404
# Create your views here.

class StudentSingleEndpoint(APIView):
    def get(self, request):
        student_id = request.query_params.get('id', None)
        if student_id:
            student = get_object_or_404(Student, id=student_id)
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        students = Student.objects.all().order_by('-created_at')
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        student_id = request.data.get('id')
        if not student_id:
            return Response({"detail":"id required in body for update"}, status=status.HTTP_400_BAD_REQUEST)
        student = get_object_or_404(Student, id=student_id)
        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        student_id = request.query_params.get('id')
        if not student_id:
            return Response({"detail":"id required as query param for delete"}, status=status.HTTP_400_BAD_REQUEST)
        student = get_object_or_404(Student, id=student_id)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)