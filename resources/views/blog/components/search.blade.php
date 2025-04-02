<div class="col-md-4  ms-auto">
    <form class="d-flex" action="{{ $attributes['action'] }}" method="GET">
        @csrf
        <div class="input-group  w-100">
            <input class="form-control form-control-lg" type="text" placeholder="Search" name="search" value="{{$attributes['search']}}">
            <button class="btn btn-primary px-4" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
</div>