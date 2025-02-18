<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="light-style layout-navbar-fixed layout-menu-fixed">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  {{--<title>{{relativePath(config('app.url'))}}</title>--}}

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

  <!-- Core CSS -->
  <!-- <link rel="stylesheet" href={{asset("./css/core.css")}} />
  <link rel="stylesheet" href={{asset("./css/theme-default.css")}} />
  <link rel="stylesheet" href={{asset("./css/demo.css")}} /> -->
</head>


<body>
  <div id="root" class="layout-wrapper layout-content-navbar">
  </div>

  @viteReactRefresh
  @vite('resources/src/index.js')
</body>

</html>