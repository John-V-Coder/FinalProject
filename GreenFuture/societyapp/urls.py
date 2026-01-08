from societyapp import views
from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.index, name='index'),
    path('about-us/',views.about_us, name='about_us'),
    path('partners/', views.partners, name='partners'),
    path('green-campaign/', views.green_campaign, name='green_campaign'),
    path('testimonials/', views.testimonials, name='testimonials'),
    path('events/', views.events, name='events'),
    path('green-hub/', views.farming_academy, name='farming_academy'),
    path('blog/',views.blog, name='blog'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
    path('contact/',views.contact, name='contact'),
    path('donate/',views.donate, name='donate'),
    path('donation/update/<int:donation_id>/', views.donation_update, name='donation_update'),
]
