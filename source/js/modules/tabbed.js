import {checkSpaceBar, checkEnter, checkArrowRight, checkArrowLeft, checkArrowDown} from './util';

const tabbed = ({selectors: [tabListSelector, tabSelector, tabPanelSelector],
  activeClass,
  nameSpace,
  display = `block`
}) => {
  const tabList = document.querySelector(tabListSelector);
  const tabs = document.querySelectorAll(tabSelector);
  const panels = document.querySelectorAll(tabPanelSelector);
  const actAsIfTabListIsClicked = onTabListClick;
  let tabFocus = 0;
  let selectedTab = 0;

  setup();

  function setup() {
    tabList.setAttribute(`role`, `tablist`);

    tabs.forEach((tab, i) => {
      tab.setAttribute(`role`, `tab`);
      tab.setAttribute(`id`, `${nameSpace}-${i + 1}`);
      tab.setAttribute(`tabindex`, -1);
    });
    tabs[tabFocus].setAttribute(`tabindex`, 0);

    panels.forEach((panel, i) => {
      panel.setAttribute(`role`, `tabpanel`);
      panel.setAttribute(`aria-labelledby`, `${nameSpace}-${i + 1}`);
      panel.setAttribute(`tabindex`, 0);
    });

    changeTabs(0);

    tabList.addEventListener(`click`, onTabListClick);
    tabList.addEventListener(`keydown`, onTabListKeydown);
  }

  function changeTabs(i = 0) {
    tabs.forEach((tab) => {
      tab.setAttribute(`aria-selected`, false);
      tab.classList.remove(activeClass);
    });
    tabs[i].setAttribute(`aria-selected`, true);
    tabs[i].classList.add(activeClass);
    selectedTab = i;

    panels.forEach((panel) => {
      panel.style.display = `none`;
    });
    panels[i].style.display = display;
  }

  function manageTabFocus(evt) {
    tabs[tabFocus].setAttribute(`tabindex`, -1);
    if (checkArrowRight(evt)) {
      tabFocus++;
      // If we're at the end, go to the start
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (checkArrowLeft(evt)) {
      tabFocus--;
      // If we're at the start, move to the end
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute(`tabindex`, 0);
    tabs[tabFocus].focus();
  }

  function onTabListClick(evt) {
    const target = evt.target.closest(tabSelector);

    if (target) {
      evt.preventDefault();
      const index = Array.prototype.indexOf.call(tabs, target);
      changeTabs(index);
    }
  }

  function onTabListKeydown(evt) {
    if (checkArrowRight(evt) || checkArrowLeft(evt)) {
      manageTabFocus(evt);
    }

    if (checkArrowDown(evt)) {
      evt.preventDefault();
      panels[selectedTab].focus();
    }

    if (checkSpaceBar(evt) || checkEnter(evt)) {
      actAsIfTabListIsClicked(evt);
    }
  }
};

export default tabbed;
