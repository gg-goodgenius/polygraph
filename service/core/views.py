from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from core.serializer import *



class PersonViewset(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerilizer


class PersonDataViewset(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonDataSerilizer

class UploadFileView(APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, filename, format=None):
        try:
            print(request.FILES)
            file_obj = request.FILES.get('file',None)
            f = File(file=file_obj)
            f.save()
            f.create_records()
        except Exception as e:
            print(e)
        return Response(status=204)


class CalcLevelView(APIView):
    def get(self, request, person_id):
        person = Person.objects.get(pk=person_id)
        person.get_all_levels()
        return Response(status=200)