const categorias_array = [
    {
        nombre: "categoria X", 
        id: 1
    },
    {
        nombre: "categoria Y", 
        id: 2
    }
]

const posts_array = [
    {
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
    },
    {
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
    },
    {
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
    }
]

/****************************************/

class Informacion extends React.Component {
    
     render() {
        return ( 
            <div className="informacion">
                <div className="informacion-titulo">{this.props.titulo}</div>
                <div className="informacion-cuerpo">{this.props.cuerpo}</div>
                <div className="informacion-fecha">{this.props.creacion}</div>
            </div>
        );
    }    
    
}

class Autor extends React.Component {
    
    setImage(imagen){
        
        return imagen ? "assets/"+imagen : "assets/avatar-default.png"; 
        
        
    }
     render() {
        return ( 
            <div className="autor"> 
                <img src={this.setImage(this.props.avatar.thumbail)}/>
                <div className="autor-nombre">{this.props.nombre}</div>
                <div className="autor-nacimiento">{this.props.nacimiento}</div>
            </div>
        );
    }    
    
}

class Post extends React.Component {
    setPosition(contador){
        
        if(contador % 2 == 0){
            
            return (
                <div className="post">
                    <Autor nombre={this.props.post.autor.nombre} nacimiento={this.props.post.autor.nacimiento} avatar={this.props.post.autor.avatar}></Autor>
                    <Informacion titulo={this.props.post.titulo} cuerpo={this.props.post.cuerpo} creacion={this.props.post.fecha}></Informacion>
                </div>
            )
            
        } else {
            
            return (
                <div className="post">
                    <Informacion titulo={this.props.post.titulo} cuerpo={this.props.post.cuerpo} creacion={this.props.post.fecha}></Informacion>
                    <Autor nombre={this.props.post.autor.nombre} nacimiento={this.props.post.autor.nacimiento} avatar={this.props.post.autor.avatar}></Autor>
                </div>
            )
            
        }
        
    }
    render() {
        return this.setPosition(this.props.contador);
    }
    
}


class ListaPosts extends React.Component {
   
    render() {
        return ( 
            <div className="lista-posts"> 
                {this.props.posts.map((post, indice) => <Post key={post.id} contador={indice} post={post}></Post>)} 
            </div>
        );
    }
}

class Sidebar extends React.Component {
    
    render() {
        return ( 
            <aside> 
               <div>Categorias: </div>
                {this.props.categorias.map((categoria, indice) => <div key={categoria.id}>{categoria.nombre}</div>)}
            </aside>
        );
    }
    
    
}


class Contenido extends React.Component{
    
       render() {
        return ( 
            <div className="contenido">
                <ListaPosts posts={this.props.posts}></ListaPosts>
                <Sidebar categorias={this.props.categorias}></Sidebar>
            </div>
        );
    }
}


class Cabecera extends React.Component {
    
    render() {
        return ( 
            <header> 
                Cabecera
            </header>
        );
    }
    
    
}

class Pie extends React.Component {
    
    render() {
        return ( 
            <footer> 
                Pie de pagina
            </footer>
        );
    }
    
    
}


ReactDOM.render( (
    <div>
        <Cabecera></Cabecera>
        <Contenido posts={posts_array} categorias={categorias_array}></Contenido> 
        <Pie></Pie>
    </div>

    ),
    document.querySelector(".contenedor")
);
