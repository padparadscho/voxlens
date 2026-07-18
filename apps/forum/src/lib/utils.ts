// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins class names conditionally
 * @param inputs Class values to merge
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
