from django.contrib import admin

from core.models import Person, Question, File

admin.site.register(Person)
admin.site.register(Question)
admin.site.register(File)
