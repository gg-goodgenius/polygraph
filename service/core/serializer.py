from socket import inet_aton
from core.models import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class PersonSerilizer(ModelSerializer):
    level = SerializerMethodField('get_level')
    

    def get_data1(self, instance):
        return instance.data2obj(1)

    def get_level(self, instance):
        return instance.get_stress_level()

    class Meta:
        model = Person
        fields = '__all__'



class QuestionSerilizer(ModelSerializer):
    data1 = SerializerMethodField('get_data1')
    data2 = SerializerMethodField('get_data2')

    def get_data1(self, instance):
        return instance.data2obj(1)
    def get_data2(self, instance):
        return instance.data2obj(2)

    class Meta:
        model = Question
        fields = '__all__'


class PersonDataSerilizer(ModelSerializer):
    level = SerializerMethodField('get_level')
    tests = QuestionSerilizer(many=True)
    list_tests =  SerializerMethodField('get_tests')

    def get_level(self, instance):
        return instance.get_stress_level()

    def get_tests(self, instance):
        return instance.get_tests()

    class Meta:
        model = Person
        fields = '__all__'