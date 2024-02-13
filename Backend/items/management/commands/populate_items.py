# populate_items.py

from django.core.management.base import BaseCommand
from items.models import Item, Category
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Populate items'

    def handle(self, *args, **kwargs):
        # Fetch or create categories
        Bundles, _ = Category.objects.get_or_create(name='Bundles')
        Processing, _ = Category.objects.get_or_create(name='Processing')

        user = User.objects.get(username='sai')

        # Populate items
        items_data = [
            {'sku': 'SKU1', 'name': 'Item 1', 'category': Bundles, 'user': user,'tags': 'Tag1, Tag2', 'stock_status': 'In stock', 'available_stock': 10},
            {'sku': 'SKU2', 'name': 'Item 2', 'category': Processing, 'user' : user, 'tags': 'Tag3, Tag4', 'stock_status': 'Out of stock', 'available_stock': 0},
            # Add more items as needed
        ]

        for item_data in items_data:
            Item.objects.get_or_create(**item_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated items.'))
