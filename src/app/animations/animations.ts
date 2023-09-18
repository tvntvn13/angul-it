import { animate, group, query, style } from '@angular/animations';

export const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-100%)', opacity: '0' }),
        animate(
          '.7s ease-out',
          style({ transform: 'translateX(0%)', opacity: '1' }),
        ),
      ],
      {
        optional: true,
      },
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)', opacity: '1' }),
        animate(
          '.7s ease-in',
          style({ transform: 'translateX(100%)', opacity: '0' }),
        ),
      ],
      {
        optional: true,
      },
    ),
  ]),
];

export const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)', opacity: '0' }),
        animate(
          '.7s ease-out',
          style({ transform: 'translateX(0%)', opacity: '1' }),
        ),
      ],
      {
        optional: true,
      },
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)', opacity: '1' }),
        animate(
          '.7s ease-in',
          style({ transform: 'translateX(-100%)', opacity: '0' }),
        ),
      ],
      {
        optional: true,
      },
    ),
  ]),
];

export const fade = [
  query(':enter', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ opacity: '0' }),
        animate('.7s ease-out', style({ opacity: '1' })),
      ],
      {
        optional: true,
      },
    ),
  ]),
];

export const fadePop = [
  query(
    ':enter, :leave',
    style({
      position: 'absolute',
      width: '100vw',
      bottom: '1.5rem',
      display: 'inline-flex',
      opacity: '0',
    }),
    {
      optional: true,
    },
  ),
  group([
    query(
      ':enter',
      [style({ opacity: '0' }), animate('1s', style({ opacity: '1' }))],
      {
        optional: true,
      },
    ),
    query(
      ':leave',
      [style({ opacity: '1' }), animate('.1s', style({ opacity: '0' }))],
      {
        optional: true,
      },
    ),
  ]),
];
