// Handle response in an industry standard way

import { NextResponse } from "next/server";


export function success(data={}, status=200) {
    return NextResponse.json({...data, status});
}

export function serverError(error={}, status=500) {
    return NextResponse.json({...error, status});
}

export function notFound(data={}, status=404) {
    return NextResponse.json({...data, status});
}

export function badRequest(data={}, status=400) {
    return NextResponse.json({...data, status});
}

export function unauthorized(data={}, status=401) {
    return NextResponse.json({...data, status});
}