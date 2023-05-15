<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        @csrf
        <meta name="viewport"
              content="width=device-width, authSlice-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React-Laravel</title>
        <link rel="stylesheet" href="{{asset('css/app.css') }}">

    </head>
    <body class="of-bg-dark">
        <div class="header-space" id="app">

        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>

