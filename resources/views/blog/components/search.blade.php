<!-- Search bar -->
<div class="col-md-3  ms-auto">
    <form class="d-flex" action="{{ $attributes['action'] }}" method="GET">
        @csrf
        <div class="input-group">
            <input class="form-control form-control-lg" type="text" placeholder="Search" name="search">
            <button class="btn btn-primary px-4" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
</div>