from django.db import models
from statistics import mean
import random

class Person(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=100, unique=True, primary_key=True)
    
    def get_stress_level(self):
        levels = [q.class_label for q in self.tests.all()]
        sum = 0
        for level in levels:
            if level is not None:
                sum += level
        return round(sum/len(levels))

    def get_tests(self):
        result = []
        tests = self.tests.all().values('test')
        for test in tests:
            if test['test'] not in result:
                result.append(test['test'])
        return sorted(result)

    def get_all_levels(self):
        for test in self.tests.all():
            test.get_level()

    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        ordering: ['name']

class Question(models.Model):
    TYPE_STATE = (
        (0, 'Новый'),
        (1, 'Ручное'),
        (2, 'Автоматическое'),
    )
    person = models.ForeignKey(verbose_name="Испытуемый", to=Person, on_delete=models.CASCADE, related_name="tests")
    test = models.IntegerField(verbose_name="Номер теста")
    presentation = models.IntegerField(verbose_name="Номер повторения")
    question = models.IntegerField(verbose_name="Номер вопроса")
    text = models.CharField(verbose_name="Текст вопроса", max_length=500, default="Вопрос")
    data1 = models.TextField(verbose_name="Показатели фотоплетизмограмма")
    data2 = models.TextField(verbose_name="Показатели пьезоплетизмограмма")
    class_label = models.IntegerField(verbose_name="Класс стресса", null=True, blank=True)
    state = models.IntegerField(default=1, choices=TYPE_STATE)

    def get_level(self):
        #TODO add model here
        self.class_label = random.randint(0,2)
        print(f"{self.person}: {self.id} new class_label {self.class_label}")
        self.save()

    def data2obj(self, num:int):
        if num == 1:
            return [int(x) for x in self.data1[1:-1].split(', ')]
        else:
            return [int(x) for x in self.data2[1:-1].split(', ')]

    def __str__(self) -> str:
        return f"Тест {self.test}/{self.presentation}/{self.question}"

    class Meta:
        ordering: ['state']

class File(models.Model):
    file = models.FileField(upload_to='datasets')

    def __str__(self) -> str:
        return f"{self.file.path}"

    def create_records(self):
        import pandas as pd
        df = pd.read_excel(self.file.path, engine='openpyxl')
        for col,d in df.iterrows():
            p, created = Person.objects.get_or_create(pk=d["Filename"])
            p.save()
            q = Question(person=p, test=d["Test_index"], presentation=d["Presentation"], question=d["Question"], data1=d["Data"], data2=d["Data_2"], state=0)
            if d.get('Class_label', 0):
                q.class_label = d['Class_label']
            q.save()
            print(f"{p}: {q} saved!")