import {CSSProperties} from "preact/compat";

export function getPopUpPosition(
  popupWidth: number,
  popupHeight: number,
  menuAnchor: HTMLDivElement
)
{
  const rect = menuAnchor.getBoundingClientRect();
  const pageX = +rect.right;
  const pageY = +rect.bottom;
  const {innerWidth, innerHeight} = window;

  const position: CSSProperties = {};

  const spaceLeft = innerWidth - pageX;
  const spaceRight = pageX;
  const spaceAbove = pageY;
  const spaceBelow = innerHeight - pageY;

  // Calculate position based on available space
  if(spaceLeft >= popupWidth)
  {
    const right = innerWidth - pageX;
    if(right + popupWidth >= innerWidth)
    {
      position.right = innerWidth - pageX - popupWidth;
    }
    else
    {
      position.right = right;
    }
    position.right = +position.right + 24;
  }
  else if(spaceRight >= popupWidth)
  {
    position.left = pageX;
    if(pageX + popupWidth >= innerWidth)
    {
      position.left = pageX - popupWidth;
    }
    position.left = +position.left - 24;
  }

  if(spaceBelow >= popupHeight)
  {
    position.top = pageY;
    if(pageY + popupHeight >= innerHeight)
    {
      position.top = pageY - popupHeight;
    }
  }
  else if(spaceAbove >= popupHeight)
  {
    const bottom = innerHeight - pageY;
    if(bottom + popupHeight >= innerHeight)
    {
      position.bottom = bottom - popupHeight;
    }
    else
    {
      position.bottom = bottom;
    }
  }

  // Default position if no suitable space found
  if(Object.keys(position).length === 0)
  {
    position.bottom = innerHeight - pageY;
    position.right = innerWidth - pageX;
  }

  setBoxShadow(position);

  return position;
}

function setBoxShadow(style: CSSProperties)
{
  if(style.top)
  {
    if(style.left)
    {
      style.top = +style.top + 16;
      style.left = +style.left + 24;
      style.boxShadow = "-5px -5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
    else if(style.right)
    {
      style.top = +style.top + 16;
      style.right = +style.right + 8;
      style.boxShadow = "5px -5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
  }
  else if(style.bottom)
  {
    if(style.left)
    {
      style.bottom = +style.bottom + 60;
      style.left = +style.left + 24;
      style.boxShadow = "-5px 5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
    else if(style.right)
    {
      style.bottom = +style.bottom + 60;
      style.right = +style.right + 12;
      style.boxShadow = "5px 5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
  }
}
