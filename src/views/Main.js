import React from 'react';
import { Navbar } from '../components/Navbar';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Profile } from './Profile';
import { Contact } from './Contact';
import '../custom.css';
import { Shop } from './Shop';
import { Cart } from './Cart';
import {BlogSingle} from './BlogSingle';

export const Main = (props) =>
{
    return (
        <div>
            <header>
                <Navbar signIn={props.signIn} />
            </header>

            <main className="container">
                <Switch>
                    <Route exact path={'/'} render={() => <Home posts={props.posts} />} />

                    <Route exact path={'/blog/:id'} render={({match}) => <BlogSingle match={match}/>} />

                    <Route exact path={'/profile'} render={() => <Profile />} />
                    <Route exact path={'/contact'} render={() => <Contact />} />

                    <Route exact path={'/shop'} render={() => <Shop />} />
                    <Route exact path={'/shop/cart'} render={() => <Cart />} />
                </Switch>
            </main>

            <footer>

            </footer>
        </div>
    )
}