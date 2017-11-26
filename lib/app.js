const categorias_array = [{
    nombre: "categoria X",
    id: 1
}, {
    nombre: "categoria Y",
    id: 2
}];

const posts_array = [{
    titulo: "Historia de xavier",
    autor: {
        id: 1,
        nombre: "Xavier",
        avatar: {
            thumbail: null,
            original: null
        },
        nacimiento: 737458389
    },
    cuerpo: "Una cosa es una cosa",
    fecha: "fecha",
    id: 1,
    categoria: categorias_array[0],
    likes: 0
}, {
    titulo: "Historia de Daniel",
    autor: {
        id: 2,
        nombre: "Daniel",
        avatar: {
            thumbail: null,
            original: null
        },
        nacimiento: 737458389
    },
    cuerpo: "Una cosa es una cosa",
    fecha: "fecha",
    id: 2,
    categoria: categorias_array[0],
    likes: 0
}, {
    titulo: "Historia de Cis",
    autor: {
        id: 3,
        nombre: "Cis",
        avatar: {
            thumbail: null,
            original: null
        },
        nacimiento: 737458389
    },
    cuerpo: "Una cosa es una cosa",
    fecha: "fecha",
    id: 3,
    categoria: categorias_array[1],
    likes: 0
}];

/****************************************/

class Informacion extends React.Component {

    render() {
        return React.createElement(
            "div",
            { className: "informacion" },
            React.createElement(
                "div",
                { className: "informacion-titulo" },
                this.props.titulo
            ),
            React.createElement(
                "div",
                { className: "informacion-cuerpo" },
                this.props.cuerpo
            ),
            React.createElement(
                "div",
                { className: "informacion-fecha" },
                this.props.creacion
            )
        );
    }

}

class Autor extends React.Component {

    setImage(imagen) {

        return imagen ? "assets/" + imagen : "assets/avatar-default.png";
    }
    render() {
        return React.createElement(
            "div",
            { className: "autor" },
            React.createElement("img", { src: this.setImage(this.props.avatar.thumbail) }),
            React.createElement(
                "div",
                { className: "autor-nombre" },
                this.props.nombre
            ),
            React.createElement(
                "div",
                { className: "autor-nacimiento" },
                this.props.nacimiento
            )
        );
    }

}

class Post extends React.Component {
    setPosition(contador) {

        if (contador % 2 == 0) {

            return React.createElement(
                "div",
                { className: "post" },
                React.createElement(Autor, { nombre: this.props.post.autor.nombre, nacimiento: this.props.post.autor.nacimiento, avatar: this.props.post.autor.avatar }),
                React.createElement(Informacion, { titulo: this.props.post.titulo, cuerpo: this.props.post.cuerpo, creacion: this.props.post.fecha })
            );
        } else {

            return React.createElement(
                "div",
                { className: "post" },
                React.createElement(Informacion, { titulo: this.props.post.titulo, cuerpo: this.props.post.cuerpo, creacion: this.props.post.fecha }),
                React.createElement(Autor, { nombre: this.props.post.autor.nombre, nacimiento: this.props.post.autor.nacimiento, avatar: this.props.post.autor.avatar })
            );
        }
    }
    render() {
        return this.setPosition(this.props.contador);
    }

}

class ListaPosts extends React.Component {

    render() {
        return React.createElement(
            "div",
            { className: "lista-posts" },
            this.props.posts.map((post, indice) => React.createElement(Post, { key: post.id, contador: indice, post: post }))
        );
    }
}

class Sidebar extends React.Component {

    render() {
        return React.createElement(
            "aside",
            null,
            React.createElement(
                "div",
                null,
                "Categorias: "
            ),
            this.props.categorias.map((categoria, indice) => React.createElement(
                "div",
                { key: categoria.id },
                categoria.nombre
            ))
        );
    }

}

class Contenido extends React.Component {

    render() {
        return React.createElement(
            "div",
            { className: "contenido" },
            React.createElement(ListaPosts, { posts: this.props.posts }),
            React.createElement(Sidebar, { categorias: this.props.categorias })
        );
    }
}

class Cabecera extends React.Component {

    render() {
        return React.createElement(
            "header",
            null,
            "Cabecera"
        );
    }

}

class Pie extends React.Component {

    render() {
        return React.createElement(
            "footer",
            null,
            "Pie de pagina"
        );
    }

}

ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(Cabecera, null),
    React.createElement(Contenido, { posts: posts_array, categorias: categorias_array }),
    React.createElement(Pie, null)
), document.querySelector(".contenedor"));