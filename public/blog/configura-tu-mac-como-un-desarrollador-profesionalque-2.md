---
title: Configura tu terminal de Mac como un desarrollador profesional
date: '2015-01-10'
url: >-
  https://carlosazaustre.es/blog/configura-tu-mac-como-un-desarrollador-profesionalque-2
tags:
  - herramientas
  - web
---

# Configura tu terminal de Mac como un desarrollador profesional

> Publicado el 2015-01-10 — https://carlosazaustre.es/blog/configura-tu-mac-como-un-desarrollador-profesionalque-2

¿Quieres tener un flujo de trabajo que te permita ser ágil, ahorrar tiempo y ser más productivo en el desarrollo de tus proyectos? A continuación cuento una serie de aplicaciones y configuraciones que harán más agradable la jornada de trabajo en tu Mac. Hoy hablaremos de la terminal.

### iTerm2

Mac OSX viene con un terminal por defecto, como todos los sistemas operativos, sin embargo en ocasiones se queda demasiado limitado. Tenemos una alternativa en Mac que se llama [iTerm2](http://iterm2.com/). Es gratuita y podemos descargarla desde su [página web](http://iterm2.com/).

Una de las cosas que más me gusta es la opción de ocultar y mostrar el terminal rápidamente con una combinación de teclas. Para configurar esta opción, debemos ir al menú `iTerm2 > Preferences...`, clickar en la pestaña `Keys` y habilitar el checkboxk `Hotkey - Show/hide iTerm2 with a system-wide hotkey`

![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-13-58-48.png)

#### Colores

También podemos configurar los colores que se muestran en la terminal, eligiendo unos que nos resulten agradables. Para ello en la ventana de preferencias elegimos la pestaña `Profiles`, nos creamos uno nuevo. En mi caso le he puesto mi nombre `carlosazaustre` y

![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-14-05-55.png)

Los predefinidos que usará el sistema son `Black`, `Red`, `Green`, `Yellow`, `Blue`, `Magenta`, `Cyan` y `White`. Podemos cambiar sus valores hexadecimales por otros que nos resulten más agradables.

Un Theme para iTerm que resulta cómodo para la vista a la hora de trabajar y pasar muchas horas en la pantalla es el conocido cómo `Solarized Dark`. Para añadir este theme a iTerm nos dirigimos al proyecto [Solarized en Github](https://github.com/altercation/solarized) y clickamos en la carpeta [iterm2-colors-solarized](https://github.com/altercation/solarized/tree/master/iterm2-colors-solarized). Elegimos el fichero `Solarized Dark.itermscolors` y pulsamos en `RAW` [para ver su contenido en texto plano](https://raw.githubusercontent.com/altercation/solarized/master/iterm2-colors-solarized/Solarized%20Dark.itermcolors). Guardamos el fichero en nuestro equipo con extensión `.itermcolors` y lo importamos en iTerm, en la pestaña `Profiles` en el botón `Load Presets...` Una vez importado, lo seleccionamos en el menú desplegable para activarlo.

#### Shell

Lo más normal es que tu shell por defecto sea `bash`. Para comprobarlo solo tienes que escribir el siguiente comando en la terminal:

```shell
$ echo $SHELL
```

Que te responderá con

```shell
/bin/bash
```

`Bash` no está mal, pero prefiero utilizar `zsh` por las posibilidades y configuraciones que permite. Para cambiar el tipo de Shell en Mac. Abrimos el **Panel de Preferencias del sistema**, elegimos **Usuarios y Grupos**. Clickamos en nustro usuario con _Click Derecho_ y elegimos _Opciones avanzadas_

![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-14-25-09.png)

En el campo `Login Shell` elegimos la opción `/bib/zsh`:

![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-14-26-27.png)

Tu terminal de iTerm lucirá ahora así:
![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-14-28-53.png)

Es el momento de personalizar el prompt por uno más **Pro** y útil que el que trae por defecto

#### Prompt

La fuente por defecto que trae iTerm es `Monaco`, que no está mal, pero yo últimamente prefiero la tipografía de `Ubuntu`. La podemos descargar desde [font.ubuntu.com](http://font.ubuntu.com/) y una vez instalada la versión `Monospace` en nuestro sistema, la activamos desde la pestaña **Text** en el tab **Profiles** de las **Preferencias de iTerm**

![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-14-35-51.png)

Para poder cambiar el shell por defecto que trae `zsh`, por uno más personalizado, tenemos que editar el fichero `.zshrc` en el directorio home, o `~`

Cargamos los colores de iTerm dentro de la configuración del fichero con `autoload -U colors && colors`.

Para personalizar el prompt usamos la variable `PROMPT`. Si escribimos algo como `PROMPT=" > "` en nuestro terminal tendremos algo como esto:

![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-15-35-48.png)

Podemos configurarlo con más información y colores para hacerlo más identificable.

- La variable `$fg[color]` nos permite cambiar el color de lo que estamos escribiendo sustituyendo `color` por `red`, `yellow`, `green`, etc...
- la variable `%n` nos devuelve el nombre del usuario del sistema, en mi caso `carlosazaustre`
- `%m` nos devuelve el nombre de la máquina, en mi caso `macbookpro`.
- `%~` nos permite ver el directorio en el que nos encontramos.
- `%T` nos devuelve el tiempo (hora:minutos) actual.
- la variable `$reset_color` resetea los colores y vuelve a los de por defecto del terminal

También podemos crear funciones, por ejemplo la función `precmd` se ejecuta antes de cada Prompt, por lo tanto si creamos la siguiente función:

```shell
function precmd() {
  ls
}
```

Se ejecutará el comando `ls` que lista los archivos del directorio en el que nos encontremos cada vez que ejecutemos un comando.

También podemos crear alias para comandos, y así ahorrarnos escribir. Por ejemplo, podemos hacer que el comando `ll` sea el equivalente a `ls -al` para mostrar los ficheros de un directorio en 1 columna, incluyendo los archivos ocultos. Eso lo podemos hacer con la siguiente línea:
`alias ll = 'ls -al'`

También es muy útil para comandos de Git:

```shell
alias ga = 'git add'
alias gc = 'git commit -m'
alias gst = 'git status'
```

Y a continuación unas funciones que te harán ahorrar tiempo:

```shell
function take() {
  mkdir $1
  cd $1
}
```

Ésta función lo que hace es crear un directorio con el nombre que le pasemos por parámetro (`$1`) y después dirigirse a ese directorio, algo así:

```shell
carlosazaustre@macbookpro ~/development
> take project
carlosazaustre@macbookpro ~/development/project
```

Y esta otra hará que te estalle la cabeza:

```shell
function server() {
  if [ $1 ]
  then
    local port="$1"
  else
    local port="8000"
  fi
  open "http://localhost:$port" && python -m SimpleHTTPServer "$port"
}
```

Esto consigue que al teclear `server` en tu prompt, se arranque un servidor local en el directorio en que te encuentres y te abre el navegador para que puedas visualizarlo. Ideal para pruebas rápidas si no quieres configurar un servidor con Gulp o Grunt para tu entorno de desarrollo.

Mi fichero `.zshrc` completo, con lo que considero más útil, quedaría de la siguiente manera:

```shell
autoload -U colors promptinit && colors

# Quickly creates a folder
function take() {
	mkdir $1
	cd $1
}

# Run a local server on current folder
function server() {
	if [ $1 ]
	then
		local port="$1"
	else
		local port="8000"
	fi
	open "http://localhost:$port" && python -m SimpleHTTPServer "$port"
}

# Prompt
PROMPT="
$fg[red]%n$reset_color@$fg[yellow]%m$reset_color: $fg[green]%~$reset_color
$fg[green]>$reset_color "

# alias
alias ll='ls -al'
alias ga='git add'
alias gc='git commit -m'
alias gst='git status'
```

#### Oh My ZSH

Si quieres ahorrarte tiempo y ampliar la funcionalidad de tu terminal, te aconsejo que instales [Oh My ZSH](https://github.com/robbyrussell/oh-my-zsh), un framework para manejar la consiguración de tu shell.

Lo puedes instalar de la siguiente manera:

```shell
$ cd ~
$ curl -L http://install.ohmyz.sh | sh
```

Se instalará en el directorio `~/.oh-my-zsh`.
Para configurar los themes, sólo tienes que abrir el fichero `.zshrc` que se ha sido sobreescrito, y en la línea 8: `ZSH_THEME="nombre_del_theme_que_más_te_guste"`
sustituir por el theme que más te guste.

A mi, particularmente me gusta este, [nico.zsh-theme](https://gist.github.com/ntarocco/3027ed75b6e8fc1fd119), que yo he cambiado un poco.

Copia el siguiente código en un fichero con nombre `nico.zsh-theme` en la carpeta `~/.oh-my-zsh/themes`:

```shell
# fork from AVIT ZSH Theme

PROMPT='
$(_user_host)${_current_dir}$(git_prompt_info)
$fg[yellow]>$reset_color '

PROMPT2='%{$fg[grey]%}◀%{$reset_color%} '

#RPROMPT='$(_vi_status)%{$(echotc UP 1)%}$(git_prompt_short_sha) $(_git_time_since_commit) ${_return_status} %T% %{$(echotc DO 1)%}'
RPROMPT='$(_vi_status)%{$(echotc UP 1)%}$(git_prompt_short_sha) ${_return_status} %T% %{$(echotc DO 1)%}'

local _current_dir="%{$fg[magenta]%}%0~%{$reset_color%} "
local _return_status="%{$fg[red]%}%(?..⍉)%{$reset_color%}"
local _hist_no="%{$fg[grey]%}%h%{$reset_color%}"

function _user_host() {
  echo "%{$fg[red]%}%n%{$reset_color%}@%{$fg[yellow]%}%m%{$reset_color%}: "
}

function _vi_status() {
  if {echo $fpath | grep -q "plugins/vi-mode"}; then
    echo "$(vi_mode_prompt_info)"
  fi
}

function _ruby_version() {
  if {echo $fpath | grep -q "plugins/rvm"}; then
    echo "%{$fg[grey]%}$(rvm_prompt_info)%{$reset_color%}"
  fi
}

# Determine the time since last commit. If branch is clean,
# use a neutral color, otherwise colors will vary according to time.
function _git_time_since_commit() {
  if git rev-parse --git-dir > /dev/null 2>&1; then
    # Only proceed if there is actually a commit.
    if [[ $(git log 2>&1 > /dev/null | grep -c "^fatal: bad default revision") == 0 ]]; then
      # Get the last commit.
      last_commit=$(git log --pretty=format:'%at' -1 2> /dev/null)
      now=$(date +%s)
      seconds_since_last_commit=$((now-last_commit))

      # Totals
      minutes=$((seconds_since_last_commit / 60))
      hours=$((seconds_since_last_commit/3600))

      # Sub-hours and sub-minutes
      days=$((seconds_since_last_commit / 86400))
      sub_hours=$((hours % 24))
      sub_minutes=$((minutes % 60))

      if [ $hours -gt 24 ]; then
          commit_age="${days}d"
      elif [ $minutes -gt 60 ]; then
          commit_age="${sub_hours}h${sub_minutes}m"
      else
          commit_age="${minutes}m"
      fi

      color=$ZSH_THEME_GIT_TIME_SINCE_COMMIT_NEUTRAL
      echo "$color$commit_age%{$reset_color%}"
    fi
  fi
}

if [[ $USER == "root" ]]; then
  CARETCOLOR="red"
else
  CARETCOLOR="white"
fi

MODE_INDICATOR="%{$fg_bold[yellow]%}❮%{$reset_color%}%{$fg[yellow]%}❮❮%{$reset_color%}"

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg[green]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "

ZSH_THEME_GIT_PROMPT_DIRTY=" %{$fg[red]%}✗%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN=" %{$fg[green]%}✔%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_ADDED=" %{$fg[green]%}✚{$reset_color%}"
ZSH_THEME_GIT_PROMPT_MODIFIED=" %{$fg[yellow]%}⚑{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DELETED=" %{$fg[red]%}✖{$reset_color%} "
ZSH_THEME_GIT_PROMPT_RENAMED=" %{$fg[blue]%}▴{$reset_color%} "
ZSH_THEME_GIT_PROMPT_UNMERGED=" %{$fg[cyan]%}§{$reset_color%} "
ZSH_THEME_GIT_PROMPT_UNTRACKED=" %{$fg[grey]%}◒{$reset_color%} "

# Colors vary depending on time lapsed.
ZSH_THEME_GIT_TIME_SINCE_COMMIT_SHORT="%{$fg[green]%}"
ZSH_THEME_GIT_TIME_SHORT_COMMIT_MEDIUM="%{$fg[yellow]%}"
ZSH_THEME_GIT_TIME_SINCE_COMMIT_LONG="%{$fg[red]%}"
ZSH_THEME_GIT_TIME_SINCE_COMMIT_NEUTRAL="%{$fg[yellow]%}"

# Format for git_prompt_long_sha() and git_prompt_short_sha()
ZSH_THEME_GIT_PROMPT_SHA_BEFORE="%{$fg[white]%}[%{$fg[yellow]%}"
ZSH_THEME_GIT_PROMPT_SHA_AFTER="%{$fg[white]%}]"

# LS colors, made with http://geoff.greer.fm/lscolors/
export LSCOLORS="exfxcxdxbxegedabagacad"
export LS_COLORS='di=34;40:ln=35;40:so=32;40:pi=33;40:ex=31;40:bd=34;46:cd=34;43:su=0;41:sg=0;46:tw=0;42:ow=0;43:'
export GREP_COLOR='1;33'
```

Y en el fichero `~/.zshrc` cambia el valor de la variable `ZSH_THEME` por `nico`:

```js
ZSH_THEME = "nico";
```

Reinicia la terminal y tendrás el siguiente aspecto. Con feedback de la rama de Git en la que te encuentres, si ha habido cambios en el repositorio, etc...
![](/images/configura-tu-mac-como-un-desarrollador-profesionalque-2/Screen-Shot-2015-01-10-at-18-07-20.png)
