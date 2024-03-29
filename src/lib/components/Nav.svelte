<script lang="ts">
    import Icon from '@iconify/svelte';
    import { navLinks } from '../scripts/config';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import searchIcon from '@iconify/icons-tabler/search';
    import Search from './Search.svelte';
    import type { PackageTagLoadData } from '../../routes/docs/[package]/[tag]/+page';
    import type { DocsParser } from '../scripts/classes/DocsParser';

    export let data: PackageTagLoadData & { docs: DocsParser & { data: Exclude<DocsParser['data'], undefined> } };

    let opensearch = false;
    let searchInput: HTMLInputElement|null;

    function openSearch() {
        opensearch = true;

        setTimeout(() => searchInput?.focus(), 100);
    }
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    :root {
        --nav-height: 80px;
    }

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        height: var(--nav-height);
        width: 100%;
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 0.5rem;
        overflow: hidden;
        z-index: 5;

        .nav-container {
            height: 100%;
            width: 100%;
            @include BorderedButton();
            @include GlassBackdrop();
            display: flex;
            align-items: center;
            overflow: hidden;

            a {
                margin-right: 1rem;
                color: $white;
                text-decoration: none;
                white-space: nowrap;
            }

            a.nav-home {
                margin-right: 2rem;
                margin-left: 1rem;
                flex-shrink: 0;
                position: relative;
                @include BorderedButton();
                padding: 0.4rem 1rem;
                text-transform: capitalize;
                font-weight: 600;

                .tag {
                    .separator {
                        display: inline-block;
                        padding: 0 0.5rem;
                        font-weight: 400;
                        color: $border;
                    }

                    text-transform: lowercase;
                }
            }

            .nav-links {
                display: flex;
                width: 100%;

                a {
                    margin: 0 1rem;
                }
            }

            .search {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                height: 100%;
                padding: 0 0.5rem;

                .open-search {
                    height: calc(100% - 1rem);
                    width: 300px;
                    border: none;
                    border-radius: 5px;
                    background: $bg;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    .icon {
                        font-size: 1rem;
                        padding:  0 1rem;
                        color: darken($white, $amount: 20);
                        line-height: 1;
                        flex-shrink: 0;
                    }

                    .placeholder {
                        color: darken($white, $amount: 50);
                        font-family: 'Inter', sans-serif;
                        width: 100%;
                        font-size: 0.9rem;
                        font-weight: 500;
                        text-align: left;
                    }

                    .key {
                        height: 1.8rem;
                        width: 1.8rem;
                        line-height: 1.8;
                        padding-top: 1px;
                        margin: 0.6rem;
                        flex-shrink: 0;
                        @include BorderedButton();
                        color: darken($white, $amount: 20);
                    }
                }
            }
        }
    }

    @media (max-width: 900px) {
        .nav {
            .nav-container {
                a.nav-home {
                    margin-right: 1rem;
                }

                .nav-links {
                    justify-content: center;
                }

                .search {
                    .open-search {
                        width: 3rem;
                        justify-content: center;
                        background: none;

                        .icon {
                            font-size: 1.4rem;
                        }

                        .placeholder,
                        .key {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 775px) {
        .nav {
            .nav-container {
                a.nav-home {
                    margin-right: 0.5rem;
                    margin-left: 1rem;

                    .tag {
                        display: none;
                    }
                }

                .nav-links {
                    justify-content: unset;
                    font-size: 0.95rem;

                    a {
                        margin: 0 0.5rem;
                    }
                }
            }
        }
    }

    @media (max-width: 500px) {
        .nav .nav-container .nav-links a.canbehidden {
            display: none;
        }
    }
</style>

<div class="nav">
    <style>
        body {
            padding-top: var(--nav-height);
        }

        html,
        body {
            scroll-padding-top: var(--nav-height);
        }
    </style>
    <div class="nav-container">
        <a href="/docs/{data.package}/{data.tag}" class="nav-home">{data.package.replaceAll('-',' ')}<span class="tag"><span class="separator">/</span>{data.tag}</span></a>
        <div class="nav-links">
            {#if navLinks.length}
                {#each navLinks as link}
                    <a href={link.href} target={link.blank ? "_blank" : null} class:canbehidden={link.blank}>
                        {link.name} {#if link.blank}<Icon icon={externalLinkIcon}/>{/if}
                    </a>
                {/each}
            {/if}
        </div>
        <div class="search">
            <button class="open-search" on:click={openSearch}>
                <span class="icon">
                    <Icon icon={searchIcon} class="icon"/>
                </span>
                <span class="placeholder">
                    Search...
                </span>
                <span class="key">/</span>
            </button>
        </div>
    </div>
</div>
{#if data?.docs.data}
    <Search docs={data} bind:searchInput={searchInput} bind:open={opensearch}/>
{/if}