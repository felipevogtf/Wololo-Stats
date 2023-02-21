<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/felipevogtf/Wololo-Stats/master/src/assets/img/home/logo.png" />
</div>
<h1 align="center">
  Wololo Stats
</h1>

<div align="center">
Wololo Stats es una aplicación de Age of Empires 2 que brinda información sobre unidades, estructuras, civilizaciones y tecnologías, 
y permite comparar la mejor opción en diversas situaciones de juego.

</br>
</br>
Proyecto realizado en Ionic4.

</br>
</br>

<a href="https://raw.githubusercontent.com/felipevogtf/Wololo-Stats/demo/demo_apk/WololoStats v1.0.apk"> Descarga una APK de demostración aqui.</a>

</div>

</br>

<a href="https://raw.githubusercontent.com/felipevogtf/Wololo-Stats/master/src/assets/demo/demo.png">![demo](https://raw.githubusercontent.com/felipevogtf/Wololo-Stats/master/src/assets/demo/demo.png)</a>

## Consideraciones

El proyecto cuenta con una base de datos en SQLite, por lo tanto, solo se puede ver el contenido en dispositivos que acepten este tipo de BD (Quedan excluidos los navegadores).

## Instalación

Instalar dependencias

```
npm install
```

web deploy

```
ionic serve
```

android deploy

```
ionic cordova run android
```

## Build

Se necesita [Android SDK](https://developer.android.com/studio/).

Construir una apk debug para android

```
ionic cordova build android
```

Para producción agregar la opcion `--prod`

```
ionic cordova build android --prod
```
