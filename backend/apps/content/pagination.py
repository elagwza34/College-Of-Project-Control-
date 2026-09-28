"""Shared pagination policy for public list endpoints.

Two tiers exist on purpose:

* **Growing collections** (short courses, testimonials, events, articles, case studies)
  are paginated, because their row count grows with editorial activity and an
  unbounded response eventually times out or 502s the API.

* **Navigation-grade catalogues** (sectors, mentors, coaches, partners, credentials)
  are deliberately returned whole. They are small, hand-curated and consumed in one
  pass by the header, footer and filter controls, so paging them would break the UI
  for no scalability gain. A hard ceiling protects them instead.
"""
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

MAX_CATALOGUE_ITEMS = 200


class GrowingCollectionPagination(PageNumberPagination):
    """Paginates only when the caller asks, so existing array consumers keep working.

    `?page=1` or `?page_size=n` opts in and returns the standard DRF envelope
    (`{count, next, previous, results}`). Without either parameter the full list is
    returned exactly as before.
    """

    page_size = 24
    page_size_query_param = "page_size"
    max_page_size = 100

    def should_paginate(self, request):
        params = request.query_params
        return "page" in params or "page_size" in params


def paginated_response(request, queryset, serializer_class, **serializer_kwargs):
    """Serialize `queryset` with the shared policy for growing collections."""
    paginator = GrowingCollectionPagination()
    if paginator.should_paginate(request):
        page = paginator.paginate_queryset(queryset, request)
        data = serializer_class(page, many=True, **serializer_kwargs).data
        return paginator.get_paginated_response(data)
    data = serializer_class(queryset, many=True, **serializer_kwargs).data
    return Response(data)


def capped_catalogue(queryset, limit=MAX_CATALOGUE_ITEMS):
    """Bound a small hand-curated catalogue so it cannot grow without limit."""
    return queryset[:limit]