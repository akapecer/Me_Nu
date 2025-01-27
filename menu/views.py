from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Category
from .serializers import CategorySerializer, ProductSerializer

class CategoryList(APIView):
    def get(self, request):
        # Mostra solo le categorie principali
        categories = Category.objects.filter(parent__isnull=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class CategoryProducts(APIView):
    def get(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        if category.is_parent:
            # Se è una categoria principale, restituisce i prodotti delle sottocategorie
            products = category.get_all_products()
        else:
            # Se è una sottocategoria, restituisce i suoi prodotti
            products = category.products.all()
        serializer = ProductSerializer(products, many=True)
        return Response({
            'category': category.name,
            'products': serializer.data
        })