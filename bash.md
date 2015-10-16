# Bash Command

bash 잘 모름. POSIX기반에서 가능한 모든걸 그냥 모았음. 나중에 나누자.

## 참고자료

- [국문 튜토리얼](https://wiki.kldp.org/HOWTO/html/Adv-Bash-Scr-HOWTO/)
- [표준스트림](http://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80_%EC%8A%A4%ED%8A%B8%EB%A6%BC)
- [파일 서술자](http://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%BC_%EC%84%9C%EC%88%A0%EC%9E%90)


## prompt

프롬프트 꾸미기

- [vcprompt를 이용해서 bash 프롬프트에 VCS 정보 표시하기](http://blog.outsider.ne.kr/737)
- [Powerline - shel](https://github.com/milkbikis/powerline-shell)


## extention

`*`, `~`, `$()`, `{}`


`{}` is pattern extention. for example, `{1...5}` is from 1 to 5.

```bash
$ echo file_{A,B,C}.txt
#file_A.txt file_B.txt file_C.txt

$ mkdir {2009...2013}-0{1...9}
#2009-01 2009-02 ... 2013-09
```

`$()` is command extention.

```bash
$ echo $(ls)

$ ls -l $(which node)   #It don't need to do "which node" and then "cd path" and then "ls -l node"
or
$ ls -l `which node`
```

## redirection

`cat`, `sort`, `uniq`, `wc`, `grep`, `head`, `tail`, `tee`

Tht __output__ always go to ___stdout___ or ___stderr___

### stdin, stdout and stderr

#### stdout

`>` is redirection operator for __stdout__. `>` operator always make a new file. for attaching result on existing file, Use `>>` operator.

```bash
$ ls /usr/bin > output.txt        # The result redirected to output.txt.

$ ls /nodir > output.txt
ls /nodir: No such file or directory    # It is "stderr", so it didn't redirected to "stdout"

$ ls /usr >> outout.txt           # The result attached on "output.txt"
```

#### stderr

Use __file discriptor__. Discriptor number is __2__ for ___stderr___. discriptor number is in front of `>` or `>>` operator. for example, `2>`

```bash
$ ls /nodir 2> ls-error.txt
```

If you want both on a file, There is following this:

```bash
$ ls /nodir &> ls-std-both.txt
#or
$ ls /nodir > ls-std-both.txt 2>&1
```

#### /dev/null

If you use __/dev/null__, Nothing will display the screen.

```bash
$ ls /nodir 2> /dev/null      # Nothing display the screen.
```

#### cat

`cat` copy contents of a file to __stdout__.

```bash
$ cat file.txt

$ cat file*.txt > all_files.txt
```

### pipe line


>  command 1 | command 2

`|` operator link __stdout__ to __stdint__.

```bash
$ ls ./ ./ | sort | less          #List was sorted and then was displayed
or
$ ls ./ ./ | sort | uniq | less   #uniq.
or
$ ls ./ ./ | sort | uniq | wc -l  #line, word count.
```

#### grep, head, tail and tee

```bash
$ head -n 5 file.txt

$ tail -n 5 file.txt

$ tail -f /var/log/messages

$ ls /usr/bin | tee ls.txt | grep zip
```


## Basic
`type`, `which`, `man`, `whatis`, `alias`

### man
`man` is program for help to use command.

### type
`type` is used to check for making alias.

```bash
$ type type
type is a shell builtin

$ type ll
ll is aliased to `ls -l'

$ type cd
cd is a function
cd ()
{
    original_cd "$*";
    tabname $(basename $(pwd))
}

$ type node
node is /usr/local/bin/node

```

### alias
```bash
$ type foo
-bash: type: foo: not found

$ alias foo ='cd /usr;ls;cd -'
```
## File & Directory

### ln

#### hard link
```bash
$ ln fun fun-hard
$ ls -l
total 32
drwxr-xr-x  2 zziuni  staff    68  8  9 11:36 dir1
drwxr-xr-x  2 zziuni  staff    68  8  9 11:37 dir2
-rw-r--r--  2 zziuni  staff  4892  8  9 11:35 fun
-rw-r--r--  2 zziuni  staff  4892  8  9 11:35 fun-hard

$ ls -li      #First column is inode. if inode same, They are same files.
total 32
13563643 drwxr-xr-x  2 zziuni  staff    68  8  9 11:36 dir1
13563644 drwxr-xr-x  2 zziuni  staff    68  8  9 11:37 dir2
13563660 -rw-r--r--  2 zziuni  staff  4892  8  9 11:35 fun
13563660 -rw-r--r--  2 zziuni  staff  4892  8  9 11:35 fun-hard

```

#### symbolic link
```bash
$ ln -s item link    #item can be file or directory.

$ ln -s fun fun-sym
zziuni@luigiui-MacBook-Air:~/source/temp/playground
$ ll
total 40
drwxr-xr-x  2 zziuni  staff    68  8  9 11:36 dir1
drwxr-xr-x  2 zziuni  staff    68  8  9 11:37 dir2
-rw-r--r--  2 zziuni  staff  4892  8  9 11:35 fun             #origin
-rw-r--r--  2 zziuni  staff  4892  8  9 11:35 fun-hard        #hard
lrwxr-xr-x  1 zziuni  staff     3  8  9 11:45 fun-sym -> fun  #symbolic

zziuni@luigiui-MacBook-Air:~/source/temp/playground
$ ln -s ../fun dir1/fun-sym         #be careful, First arguemnt is dependent to second.

zziuni@luigiui-MacBook-Air:~/source/temp/playground
$ ll dir1
total 8
lrwxr-xr-x  1 zziuni  staff  6  8  9 11:46 fun-sym -> ../fun
```

### mkdir

```bash
  $ mkdir directory...  #다중 생성 가능.
```

### cp, mv, rm

use `man cp`

```bash
  $ cp item... directory
  $ cp -i filename dir       #overwrite check
  $ cp -u file1 file2 dir    #update
  $ cp -r file1 dir1 dir2    #copy directory
  $ cp -f file1 dir1 dir2    #force do it.
  $ cp -v file1 dir1 dir2    #detail result.
```

### find
```bash
  $ find . -type f -name 'workbench.directives.js'
```

### Etc

```bash
  $ ls -l
  $ file [fileName]
  $ less [fileName]
```


## only Mac Command
### pbcopy, pbpaste

You can CnP on the terminal. The Clipboad is called The PastBoard on the OSx. so this command name is 'pbxxx'. :)

```bash
  //copy
  $> pbcopy < document.txt
  $> cat document.txt | pbcopy

  //past
  $> pbpaste
```

### Etc

* `chflags nohidden ~/Library/`
* `caffeinate`
* growl notification
* skitch



## Info

### Wildcard

* *
* ?
* [characters]
* [!characters]
* [:alnum:]
* [:alpha:]
* [:digit:]
* [:lower:]
* [:upper:]

```
    b*.txt
    Data???
    [abc]*
    [[:upper:]]*  //대문자로 시작하는 모든 파일.
```