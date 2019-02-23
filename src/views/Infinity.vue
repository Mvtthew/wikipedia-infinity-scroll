<template>
    <div class="infinity">
        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <span class="navbar-brand mb-0 h1">Wikipedia infinity! <i class='bx bxf bx-infinite'></i></span>
            </div>
            <div class="container">
                <p class="m-0">
                    Start scrolling down!
                </p>
                <p class="ml-auto mb-0 small">by Mvtthew
                    <a href="https://github.com/Mvtthew/wikipedia-infinity-scroll">
                        <i class='bx bxl-github text-dark m-0 h4 position-relative' style="bottom: -5px"></i>
                    </a>
                </p>
            </div>
        </nav>
        <div class="container">
            <div class="my-4">
                <div class="card mb-3 p-2" v-for="n in maxIndex" v-bind:id="'a' + n">
                    <p class="counter">
                        #{{n}}
                    </p>
                    <h2 class="m-0">
                        {{results[1][n-1]}}
                    </h2>
                    <p class="my-4">
                        {{results[2][n-1]}}
                    </p>
                    <a v-bind:href="results[3][n-1]" target="_blank">Read more <i class='bx bx-link-external'></i></a>
                </div>
                <div class="loading" v-show="loading">
                    <p class="m-0 display-3 text-center"><i class='bx bx-loader-alt bx-spin'></i></p>
                </div>
            </div>
        </div>
        <div class="last-search">
            <div class="container">
                <p class="m-0">
                    Last search
                </p>
                <strong>
                    <i class='bx bx-search'></i> {{results[0][maxLastSearch-1]}}
                </strong>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Infinity',
        created() {
            this.getResults();
            window.addEventListener('scroll', () => {
                this.checkScroll();
            });
        },
        data() {
            return {
                loading: false,
                results: [
                    [],
                    [],
                    [],
                    []
                ],
                maxIndex: 0,
                lastSearch: 0,
                maxLastSearch: 0,
            }
        },
        methods: {
            checkScroll() {
                let offset = document.documentElement.scrollTop + window.innerHeight;
                let height = document.documentElement.offsetHeight;

                if ((height - offset) < 100 && !this.loading) {
                    this.getResults();
                }
            },
            getResults() {
                const search = this.random(parseInt(Math.random() * 7) + 1);
                if (!this.loading) {
                    this.loading = true;
                    fetch('https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=' + search, {
                        method: 'GET',
                    }).then(res => res.json()).then(data => {
                        this.results[0] = this.results[0].concat(data[0]);
                        this.results[1] = this.results[1].concat(data[1]);
                        this.results[2] = this.results[2].concat(data[2]);
                        this.results[3] = this.results[3].concat(data[3]);
                        this.loading = false;
                        this.maxLastSearch++;
                        if (this.maxIndex === this.results[1].length) {
                            this.getResults();
                        } else {
                            this.maxIndex = this.results[1].length;
                            this.checkScroll();
                        }
                    });
                }
            },
            random(n) {
                const fromWhat = 'qwertyuiopasdfghjklzxcvbnm';
                let toReturn = '';
                for (let i = 0; i < n; i++) {
                    toReturn += fromWhat[parseInt(Math.random() * fromWhat.length)];
                }
                return toReturn;
            },
        },
    }
</script>

<style>
    .navbar {
        position: sticky;
        top: 0;
        z-index: 10000;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0.5rem 0.1rem;
    }

    .last-search {
        position: fixed;
        bottom: 0;
        z-index: 10000;
        background: #f8f9fa !important;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        width: 100%;
        padding: 0.5rem 0.1rem;
    }

    .loading {
        margin-bottom: 70px;
    }

    .bxf {
        font-size: 1.3rem;
        position: relative;
        bottom: -2px;
    }

    .counter {
        position: absolute;
        top: 9px;
        right: 9px;
        opacity: 0.6;
    }
</style>