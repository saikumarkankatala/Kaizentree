from django.core.management.base import BaseCommand
from django.apps import apps
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Populate categories'

    def handle(self, *args, **kwargs):
        # Fetch Category and User models dynamically
        Category = apps.get_model('items', 'Category')

        # Get the user
        user = User.objects.first()  # You can adjust this to fetch the desired user

        if not user:
            self.stdout.write(self.style.ERROR('No users found. Cannot populate categories.'))
            return

        # Populate categories
        categories = [
            'Bundles',
            'Raw Materials',
            'Finished Products',
            'Processing',
            # Add more categories as needed
        ]

        user = User.objects.get(username='sai')

        for category_name in categories:
            Category.objects.create(name=category_name, user=user)

        self.stdout.write(self.style.SUCCESS('Successfully populated categories.'))
