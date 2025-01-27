from django.db import models

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='children'
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    @property
    def is_parent(self):
        """Restituisce True se la categoria è una categoria principale (senza parent)."""
        return self.parent is None

    def get_all_products(self):
        """Restituisce tutti i prodotti delle sottocategorie."""
        if self.is_parent:
            # Se è una categoria principale, restituisce i prodotti delle sottocategorie
            products = []
            for child in self.children.all():
                products += list(child.products.all())
            return products
        else:
            # Se è una sottocategoria, restituisce i suoi prodotti
            return list(self.products.all())

class Product(models.Model):
    category = models.ForeignKey(
        Category, 
        related_name='products', 
        on_delete=models.CASCADE,
        limit_choices_to={'parent__isnull': False}  # Permette solo l'assegnazione a sottocategorie
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name
