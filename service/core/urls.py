from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import *

router = DefaultRouter()
router.register('person', PersonViewset, basename='person')
router.register('tests', PersonDataViewset, basename='person_data')

urlpatterns = [
    path('calc/<str:person_id>', CalcLevelView.as_view() ),
    path('upload/<str:filename>', UploadFileView.as_view() ),
    path('', include(router.urls)),
]