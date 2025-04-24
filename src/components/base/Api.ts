import {
	createClient,
	PostgrestSingleResponse,
	SupabaseClient,
} from '@supabase/supabase-js';

export abstract class Api {
	protected supabase: SupabaseClient<
		any,
		'public' extends keyof any ? 'public' : string & keyof any,
		any
	>;

	constructor(supabaseUrl: string, supabaseKey: string) {
		this.supabase = createClient(supabaseUrl, supabaseKey);
	}

	protected async _processResponse<T>(
		res: PostgrestSingleResponse<T>
	): Promise<T> {
		if (res.error) {
			throw new Error(res.error.message);
		}
		return res.data as T;
	}
}
