<form action="#" method="post" aria-label="Contactformulier">
    <div>
        <label for="naam">Naam *</label>
        <input id="naam" name="naam" type="text" autocomplete="name" required placeholder="Je volledige naam" />
    </div>

    <div>
        <label for="email">E-mail *</label>
        <input id="email" name="email" type="email" autocomplete="email" required placeholder="jouw@email.nl" />
    </div>

    <div>
        <label for="telefoon">Telefoon *</label>
        <input id="telefoon" name="telefoon" type="tel" autocomplete="tel" required placeholder="06 12345678" />
    </div>

    <div>
        <label for="onderwerp">Onderwerp *</label>
        <input id="onderwerp" name="onderwerp" type="text" autocomplete="off" required />
    </div>

    <div>
        <label for="bericht">Bericht *</label>
        <textarea id="bericht" name="bericht" rows="6" required placeholder="Vertel ons waar we je mee kunnen helpen..."></textarea>
    </div>

    <div>
        <button class="btn-secondary" type="submit">
            Verstuur Bericht
            <svg viewBox="0 0 24 24" width="25px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z" fill="#fff"></path> </g></svg>
        </button>
    </div>

    <p>* Verplichte velden</p>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        div {
            display: flex;
            flex-direction: column;
            gap: var(--space-2);

            label {
                font-size: var(--fs-label-s-mobile);
            }

            label, button {
                font-weight: var(--fw-semibold);
            }

            input, textarea {
                border: 1px solid var(--c-border-gray);
                border-radius: var(--radius-softest);
                padding: var(--space-4);
            }
        }
        p {
            text-align: center;
            font-size: var(--fs-label-s-mobile);
        }
    }
</style>