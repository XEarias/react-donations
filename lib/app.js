"use strict";

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

class BuscadorPost extends React.Component {

    constructor(props) {
        super(props);
        this.handlerSearch = this.handlerSearch.bind(this);
    }

    handlerSearch(e) {
        console.log(e.target.value);
        this.props.busqueda(e.target.value);
    }

    render() {
        return React.createElement(
            "div",
            { className: "buscador" },
            React.createElement("input", { name: "buscador", type: "text", onKeyUp: this.handlerSearch })
        );
    }
}

class ListaPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: null,
            posts: []
        };

        this.onSearch = this.onSearch.bind(this);
        this.permitidoVerificar = this.permitidoVerificar.bind(this);
    }

    componentDidMount() {

        let XE = this;
        axios.get('/api/posts').then(function (res) {

            let posts = res.data.data;

            XE.setState({
                posts: posts
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    onSearch(texto) {

        this.setState({
            busqueda: texto
        });
    }

    permitidoVerificar(id) {

        return this.props.permitidos == 0 || this.props.permitidos == id;
    }

    busquedaVerificar(autor) {
        console.log(this.state.busqueda);
        return this.state.busqueda === null || autor.toLowerCase().search(this.state.busqueda.toLowerCase()) != -1;
    }

    render() {
        return React.createElement(
            "div",
            { className: "lista-posts" },
            React.createElement(BuscadorPost, { busqueda: this.onSearch }),
            this.state.posts.map((post, indice) => {
                return this.permitidoVerificar(post.categoria.id) && this.busquedaVerificar(post.autor.nombre) ? React.createElement(Post, { key: post.id, contador: indice, post: post }) : false;
            })
        );
    }
}

class CategoriaButton extends React.Component {

    constructor(props) {
        super(props);
        this.handlerClassAllowed = this.handlerClassAllowed.bind(this);
    }

    handlerClassAllowed(e) {

        this.props.filtro(this.props.categoria);
    }

    render() {
        return React.createElement(
            "div",
            { onClick: this.handlerClassAllowed },
            this.props.nombre
        );
    }

}

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categorias: []
        };
    }

    componentDidMount() {
        let XE = this;
        axios.get('/api/categories').then(function (res) {

            let categorias = res.data.data;

            categorias.unshift({
                nombre: "Todas",
                id: 0
            });

            XE.setState({
                categorias: categorias
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return React.createElement(
            "aside",
            null,
            React.createElement(
                "div",
                null,
                "Categorias: "
            ),
            this.state.categorias.map((categoria, indice) => React.createElement(CategoriaButton, { key: categoria.id, filtro: this.props.filtro, categoria: categoria.id, nombre: categoria.nombre }))
        );
    }

}

class Contenido extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriaPermitida: 0
        };

        this.onClassAllowed = this.onClassAllowed.bind(this);
    }

    onClassAllowed(id) {

        this.setState({
            categoriaPermitida: id
        });
    }

    render() {
        return React.createElement(
            "div",
            { className: "contenido" },
            React.createElement(ListaPosts, { permitidos: this.state.categoriaPermitida, filtro: this.onClassAllowed }),
            React.createElement(Sidebar, { filtro: this.onClassAllowed })
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
    React.createElement(Contenido, null),
    React.createElement(Pie, null)
), document.querySelector(".contenedor"));