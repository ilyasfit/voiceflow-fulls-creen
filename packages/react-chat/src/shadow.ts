// create shadow dom

// const VOICEFLOW_ID = 'voiceflow-chat';

// const rootEl = document.createElement('div');
// rootEl.id = VOICEFLOW_ID;

// document.body.appendChild(rootEl);

// export const shadowRoot = rootEl.attachShadow({ mode: 'open' });


const VOICEFLOW_ID = 'voiceflow-chat';

// Check if an element with the ID already exists
let rootEl = document.getElementById(VOICEFLOW_ID);

// If the element does not exist, create and append it
if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = VOICEFLOW_ID;
    document.body.appendChild(rootEl);
}

// Attach a shadow root to the element
// export const shadowRoot = rootEl;
export const shadowRoot = rootEl.attachShadow({ mode: 'open' });
