from django.urls import path
from .views import CategoryList, CategoryProducts

urlpatterns = [
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/products/', CategoryProducts.as_view(), name='category-products'),
]